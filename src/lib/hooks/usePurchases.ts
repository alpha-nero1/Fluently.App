import { useEffect, useState } from "react";
import Purchases from "react-native-purchases";
import { Platform } from "react-native";
import { RevenueCat } from "../constants/settings";
import { PurchasesPackage } from "react-native-purchases";
import { useAppLogger } from "../logging/AppLogger";

export const usePurchases = () => {
    useEffect(() => {
        Purchases.configure({
            apiKey: Platform.OS === 'ios' 
                ? RevenueCat.IosApiKey 
                : RevenueCat.AndroidApiKey,
        });
    }, []);
}

export const useProducts = (): PurchasesPackage[] => {
    const logger = useAppLogger();
    const [packages, setPackages] = useState<PurchasesPackage[]>([]);
    
    useEffect(() => {
        const fetchPackages = async () => {
            try {
                const offerings = await Purchases.getOfferings();
                if (offerings.current?.availablePackages) {
                    setPackages(offerings.current.availablePackages);
                }
            } catch (error) {
                logger.error("Error fetching products:", error);
            }
        };
    
        fetchPackages();
    }, []);
  
    return packages;
}