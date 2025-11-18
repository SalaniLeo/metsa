import { requestPlaceName } from "$lib";

export async function load() {
    
    const coordinates = { lat: '44.8431481', lon: '11.6350808' };
    
    let placeName = await requestPlaceName(coordinates)
    placeName = placeName.address.city || placeName.address.village

    return {coordinates, placeName};

}