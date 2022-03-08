import React, {useEffect, useState} from "react";
import {doGet, doPut} from "../../../northstarre/src/makeApiCall";

export default  function AccountSetup({profile}) {

    useEffect(() => {
        doGet("userInfo/account/setup-complete", ()=> {}, () => {
        })

    }, [profile])
    return ( <div className={"flex flex-col items-center py-0 text-center font-[fira-sans] text-[#272D67] md:py-24 "}>
        <div className={"font-[fira-sans] text-3xl font-bold md:text-4xl lg:text-5xl"}>
            Your Account setup has been done
        </div>
    </div>)

}
