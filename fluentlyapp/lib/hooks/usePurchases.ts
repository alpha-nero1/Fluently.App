import { useEffect, useState } from "react";
import Purchases from "react-native-purchases";
import { PurchasesPackage } from "react-native-purchases";
import { useAppLogger } from "../logging/AppLogger";

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