import { Query } from "appwrite"
import { appwriteConfig, database } from "./client"

export const getAllTrips=async(limit:number,offset:number)=>{
    const alltrips=await database.listDocuments(
        appwriteConfig.databaseId,

        appwriteConfig.tripCollectionId,
        [
            Query.limit(limit),
            Query.offset(offset),
            Query.orderDesc("$createdAt")
        ]
    )

    if(alltrips.total ===0){
        console.log('No trips found')
        return { alltrips: [], total: 0 }
    }

    return{
        alltrips: alltrips.documents,
        total: alltrips.total
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