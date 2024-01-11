import { getLastWeeksDates } from "./utils";

const data = [
    {
        "energy_kwh": 1.23,
        "carbon_co2_lbs": 0.35
    },
    {
        "energy_kwh": 4.89,
        "carbon_co2_lbs": 2.34
    },
    {
        "energy_kwh": 4.23,
        "carbon_co2_lbs": 2.22
    },
    {
        "energy_kwh": 3.75,
        "carbon_co2_lbs": 1.92
    },
    {
        "energy_kwh": 2.90,
        "carbon_co2_lbs": 1.23
    },
    {
        "energy_kwh": 4.00,
        "carbon_co2_lbs": 2.00
    },
    {
        "energy_kwh": 4.10,
        "carbon_co2_lbs": 2.10
    }
];

const getEnergyCarbonData = () => {
    const dates = getLastWeeksDates();
    const energyData = data.map((item, index) => {
        return {
            date: dates[index],
            energy_kwh: item.energy_kwh,
            carbon_co2_lbs: item.carbon_co2_lbs
        }
    });
    return energyData
}

export default getEnergyCarbonData;