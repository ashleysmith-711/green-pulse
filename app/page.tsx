'use client'

import { useEffect, useState } from "react";
import UsageVisualizations from "./components/UsageVisualizations";
import { Toaster } from 'react-hot-toast';


const Dashboard = () => {
    return (
        <main className="flex min-h-screen flex-col p-24">
            <div className="bg-yellow-400 flex p-6 m-0 border-solid border-2 border-yellow-400">
                <img src="/greenpulse-sm.png" alt="Green Pulse small logo" className="w-24 h-24" />
                <h1 className="text-slate-700 text-3xl mt-6 ml-6"><b>Here to help you lower your carbon footprint</b></h1>
            </div>
            <UsageVisualizations />
            <Toaster />
        </main>
    )
}

export default Dashboard;