import { useEffect, useRef, useState } from 'react';
import MapView, { Marker } from 'react-native-maps';
import { Address, geocodeAddress } from '@/lib/geocode';
import { View } from 'react-native';

interface Props {
    address: string;
}

const INITIAL_REGION = {
    latitude: 37.78825,
    longitude: 0.0,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
}

export const MapPopup = ({ address }: Props) => {

    const mapRef = useRef<MapView>(null);
    const [markers, setMarkers] = useState<Array<Address>>([]);

    useEffect(() => {
        geocodeAddress(address).then((addressInfo) => {
            mapRef.current?.animateToRegion({
                latitude: addressInfo.latitude,
                longitude: addressInfo.longitude,
                latitudeDelta: 0.005,
                longitudeDelta: 0.005,
            }, 3000);
            setMarkers([...markers, addressInfo]);
        });
    }, []);

    return (
        <View className="absolute inset-0 flex-1 h-screen w-screen rounded-md">
            <MapView
                className="size-full"
                provider="google"
                initialRegion={INITIAL_REGION}
                ref={mapRef}
            >
                {markers.map((marker, index) => (
                    <Marker key={index} coordinate={marker} title={marker.name} description={marker.name} />
                ))}
            </MapView>
        </View>
    )
}