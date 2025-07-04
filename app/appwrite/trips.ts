import { Query } from "appwrite"
import { appwriteConfig, database } from "./client"

export const getAllTrips=async(limit:number,offset:number)=>{
    const allTrips=await database.listDocuments(
        appwriteConfig.databaseId,

        appwriteConfig.tripCollectionId,
        [
            Query.limit(limit),
            Query.offset(offset),
        ]
    );

    if(allTrips.total === 0){
        console.log('No trips found')
        return { allTrips: [], total: 0 }
    }

    return{
        allTrips: allTrips.documents,
        total: allTrips.total
    }

    
}

export const getTripById=async(tripId:string)=>{
    try {
        const trip = await database.getDocument(
            appwriteConfig.databaseId,
            appwriteConfig.tripCollectionId,
            tripId,
        );

        if (!trip.$id) {
            console.log('Trip not found');
            return null;
        }

        return trip;
    } catch (error) {
        console.error('Error fetching trip by ID:', error);
        return null;
    }
}