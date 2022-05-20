
export interface xAirport {
    Id: number;
    AirportName: string;
    IATACode: string;
    Municipality: string;
    IsoRegion: string;
}

interface Airport extends xAirport {
    LatitudeDeg: number;
    LongitudeDeg: number;
    Continent: string;
}
export default Airport;