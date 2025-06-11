import { ID, OAuthProvider, Query } from "appwrite"
import { account, appwriteConfig, database } from "./client"
import { data, redirect } from "react-router"

export const loginWithGoogle=async ()=>{
    try{
       account.createOAuth2Session(
        OAuthProvider.Google,
        `${window.location.origin}/`,
        `${window.location.origin}/404`
    );
    }catch(e){
         console.log('loginWithGoogle error',e)
    }
}

export const getUser=async ()=>{
    try{
       const user=await account.get();
       if(!user){
        return redirect('/sign-in')
       }

       const {documents} =await database.listDocuments(
        appwriteConfig.databaseId,
        appwriteConfig.userCollectionId,
        [
            Query.equal('accountId',user.$id),
            Query.select(['name','email','imageUrl','joinedAt','accountId'])
        ]
       )
    }catch(e){
        console.log("getUser error",e);
    }
}

export const logoutUser=async ()=>{
    try{
        await account.deleteSession("current");
    }catch(e){
         console.log('logoutUser error',e);
    }
}


export const getGooglePicture=async ()=>{
    try{
      const session =await account.getSession('current');

      const OAuthToken=session.providerAccessToken;

      if(!OAuthToken){
        console.log('No message token available')
        return null;
      }
      
      const response=await fetch('https://people.googleapis.com/v1/people/me?personFields=photos',
        {
            headers:{
                Authorization:`Bearer ${OAuthToken}`
            }
        }
    );

    if(!response.ok){
         console.log('Fails to fetch the profile photo from google People API')
         return null;
    }

    const data=await response.json();

    const photoUrl=data.photos && data.photos.length>0 
    ? data.photos[0].url
    : null;

    return photoUrl;

    }catch(e){
       console.log("getGooglePicture error:",e)
    }
}

export const storeUserData=async ()=>{
    try{
       const user=await account.get();

       if(!user) return null;

       const {documents} =await database.listDocuments(
        appwriteConfig.databaseId,
        appwriteConfig.userCollectionId,
        [
            Query.equal('accountId',user.$id),
           
        ]
       )

       if(documents.length > 0) return documents[0];

       const imageUrl=await getGooglePicture();

       const newUser=await database.createDocument(
        appwriteConfig.databaseId,
        appwriteConfig.userCollectionId,
        ID.unique(),
        {
            accountId: user.$id,
            email:user.email,
            name:user.name,
            imageUrl:imageUrl || '',
            joinedAt: new Date().toISOString(),
        }
       );

       return newUser;

    }catch(e){
        console.log('storeUserData error',e);
    }
}

export const getExistingUser=async (id:string)=>{
    try{
        const {documents,total} = await database.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.userCollectionId,
            [Query.equal("accountId",id)]
        );
        return total > 0? documents[0]:null;
    }catch(error){
        console.error("getExistingUser error",error);
        return null;
    }
}