import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import useRefreshToken from "../../Hooks/useRefreshToken";
import useAuth from "../../Hooks/useAuth";



const PersistLogin=()=>{
    const [loading,setLoading] = useState(true);
    const refresh = useRefreshToken();
    const {user,persist} = useAuth();

    useEffect(()=>{
        const verifyRefreshToken = async ()=>{
            try{
                await refresh();
            }
            catch(err){

            }
            finally{
                setLoading(false);
            }
        }
        !user?.accessToken? verifyRefreshToken(): setLoading(false);
    },[]);
    return (
        <>

        {!persist?<Outlet/>:loading?<p>Loading...</p>:<Outlet/>}
        </>
    )
} 

export default PersistLogin;