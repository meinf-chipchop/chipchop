import opencage from 'opencage-api-client';


export interface Address {
    latitude: number;
    longitude: number;
    name: string;
}

export async function geocodeAddress(address: string): Promise<Address> {
    const API_KEY: string = process.env.EXPO_PUBLIC_OPENCAGEDATA_API_KEY!;

    return opencage
        .geocode({ key: API_KEY, q: address, limit: 1 })
        .then((data) => {
            if (data.status.code === 200 && data.results.length > 0) {
                const place = data.results[0];
                return {
                    latitude: place.geometry.lat,
                    longitude: place.geometry.lng,
                    name: place.formatted,
                };
            }
            return {
                latitude: 0,
                longitude: 0,
                name: 'Error: No result found',
            }
        }).catch((error) => {
            console.log('error', error.message);
            if (error.status.code === 402) {
                console.log('hit free trial daily limit');
                console.log('become a customer: https://opencagedata.com/pricing');
            }
            return {
                latitude: 0,
                longitude: 0,
                name: 'Error: No result found',
            }
        });


}