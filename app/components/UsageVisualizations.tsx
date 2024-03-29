import { useEffect, useState } from 'react';
import styles from '../styles/dashboard.module.css';
import { reformatDate, sumByDay } from '../utils';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Rectangle } from 'recharts';
import { DailySum } from '../types';
import NotesModal from './NotesModal';
import data from '../energy-carbon-data';
import getEnergyCarbonData from '../energy-carbon-data';
import { getNotesAction } from '../api/_actions';


const UsageVisualizations = () => {
    const [notesModalDate, setNotesModalDate] = useState('');
    const [notesDate, setNotesDate] = useState('');
    const [notes, setNotes] = useState(''); // TODO: Get notes from DB for date [notesDate
    const [isModalOpen, setIsModalOpen] = useState(false);
    
    const lastWeekEnergyData = getEnergyCarbonData();

    const handleBarClick = (data: DailySum, index: number) => {
        setNotesModalDate(data.date);
        setIsModalOpen(true);
    };

    const handleShowNotes = async (...props: any[]) => {
        const date = props[0].value as string; // i.e. "Jan 9, 2024"
        console.log('__notes date pre formatting', date);
        const getNotesForDay = await getNotesAction(date);
        const { notes } = getNotesForDay[getNotesForDay.length - 1];
        setNotesDate(date);
        setNotes(notes);
    }

    useEffect(() => {
        console.log('notes date', notesDate);
    }, [notesDate]);

    return (
        <div className={`${styles.container} mt-3`}>
            <NotesModal isOpen={isModalOpen} setOpen={setIsModalOpen} date={notesModalDate} />
            <h2 className='text-xl text-green-700 mb-3 mt-3'>Energy Usage and CO2 Emissions over the last week:</h2>

            <div className='grid-cols-2'>

                <div className="flex">
                    <div className="flex-1 text-gray-100 text-center bg-pink-800 px-4 py-2 m-2 rounded-lg">
                        <p className="mt-8"><b>My total Emissions (last 7 days):</b></p>
                        <p className='text-6xl mt-10'>12.128 lbs CO2</p>
                    </div>
                    <div className="flex-1 text-gray-100 bg-green-700 px-4 py-2 m-2 ml-8 rounded-lg">
                        <p className='mb-2'><b>LEADERBOARD</b></p>
                        <ol className='list-decimal  border-solid border-2 border-text-gray-100 p-2 pl-8'>
                            <li>Laura Xu (8.22 lbs CO2)</li>
                            <li>Luis Barrueco (9.15 lbs CO2)</li>
                            <li>James Gordey (9.99 lbs CO2)</li>
                            <li>Steve Jackson (10.5 lbs CO2)</li>
                            <li>Ashley Smith (11.11 lbs CO2)</li>
                        </ol>
                        <p className="mt-2 text-grey-100">You did not made the leaderboard with CO2 emissions of 12.128.</p>
                    </div>
                </div>
            </div>
            <div>
                <h3 className='text-lg text-green-700 mb-3 mt-3'>Chart showing CO2 lbs and kwh consumed per day:</h3>
                <div className="flex">
                    <BarChart
                        width={800}
                        height={400}
                        data={lastWeekEnergyData}
                        margin={{
                            top: 5,
                            right: 30,
                            left: 20,
                            bottom: 5,
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" onClick={handleShowNotes} />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="energy_kwh" fill="#fb923c" activeBar={<Rectangle fill="#ffa042" stroke="#e18336" />} onClick={handleBarClick} />
                        <Bar dataKey="carbon_co2_lbs" fill="#0369a1" activeBar={<Rectangle fill="#0373b1" stroke="#025e90" />} onClick={handleBarClick} />
                    </BarChart>
                    {notesDate && (<div className="bg-gray-200 p-8 rounded-lg w-1/3">
                        <p><b>Notes for {notesDate}</b></p>
                        <p className="mt-2">{notes ? notes : <i>No notes saved for this date</i>}</p>
                    </div>)}
                </div>
            </div>
        </div>
    );
};

export default UsageVisualizations;
