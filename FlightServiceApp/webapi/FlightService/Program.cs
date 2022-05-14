using Microsoft.EntityFrameworkCore;
using FlightService.Library;
using FlightService;



var builder = WebApplication.CreateBuilder(args);

ConfigurationManager configuration = builder.Configuration;

// Add services to the container.

var corsPolicy = "Cors";

/*policy.WithOrigins("https://localhost:3000", "https://localhost:7072").SetIsOriginAllowedToAllowWildcardSubdomains();
*/

builder.Services.AddCors(options =>
{
    options.AddPolicy(name: corsPolicy,
        policy =>
        {
            policy.AllowAnyOrigin();
            policy.AllowAnyMethod();
            policy.AllowAnyHeader();
        });
});

builder.Services.AddControllers().AddJsonOptions(options =>
{
    options.JsonSerializerOptions.PropertyNamingPolicy = null;
    options.JsonSerializerOptions.WriteIndented = true;
    options.JsonSerializerOptions.PropertyNameCaseInsensitive = true;
});
Console.WriteLine(configuration.GetConnectionString("FSContext"));
builder.Services.AddDbContext<FSContext>(options =>
    options.UseSqlServer(configuration.GetConnectionString("FSContext")));



// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();
using (var scope = app.Services.CreateScope())
{
    var services = scope.ServiceProvider;
    FSInitializer.Initialize(services, app.Environment.IsDevelopment());
}
// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{

    app.UseSwagger();
    app.UseSwaggerUI();

}

app.UseHttpsRedirection();

app.UseCors(corsPolicy);

app.UseAuthorization();

app.MapControllers();

app.Run();
