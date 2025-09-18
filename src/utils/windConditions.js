// Beaufort scale reference (km/h)
const windSpeedBeaufort = [
    {
        max: 0.7,
        description: 'Calm',
        level: 0,
    },
    {
        max: 5.4,
        description: 'Light air',
        level: 1,
    },
    {
        max: 11.9,
        description: 'Light breeze',
        level: 2,
    },
    {
        max: 19.4,
        description: 'Gentle breeze',
        level: 3,
    },
    {
        max: 28.4,
        description: 'Moderate breeze',
        level: 4,
    },
    {
        max: 38.5,
        description: 'Fresh breeze',
        level: 5,
    },
    {
        max: 49.7,
        description: 'Strong breeze',
        level: 6,
    },
    {
        max: 61.6,
        description: 'Near gale',
        level: 7,
    },
    {
        max: 74.5,
        description: 'Gale',
        level: 8,
    },
    {
        max: 87.8,
        description: 'Severe gale',
        level: 9,
    },
    {
        max: 102.2,
        description: 'Storm',
        level: 10,
    },
    {
        max: 117.4,
        description: 'Violent storm',
        level: 11,
    },
    {
        max: Infinity,
        description: 'Hurricane',
        level: 12,
    },
];

// Wind direction mapping (8 main directions)
const windDirection8Full = [
    {
        min: 337.5,
        max: 360,
        label: 'N',
        fullLabel: 'North',
    },
    {
        min: 0,
        max: 22.5,
        label: 'N',
        fullLabel: 'North',
    },
    {
        min: 22.5,
        max: 67.5,
        label: 'NE',
        fullLabel: 'Northeast',
    },
    {
        min: 67.5,
        max: 112.5,
        label: 'E',
        fullLabel: 'East',
    },
    {
        min: 112.5,
        max: 157.5,
        label: 'SE',
        fullLabel: 'Southeast',
    },
    {
        min: 157.5,
        max: 202.5,
        label: 'S',
        fullLabel: 'South',
    },
    {
        min: 202.5,
        max: 247.5,
        label: 'SW',
        fullLabel: 'Southwest',
    },
    {
        min: 247.5,
        max: 292.5,
        label: 'W',
        fullLabel: 'West',
    },
    {
        min: 292.5,
        max: 337.5,
        label: 'NW',
        fullLabel: 'Northwest',
    },
];

// Function to get 8-direction label
export function getWindDirectionFull(degree) {
    return (
        windDirection8Full.find((dir) => degree >= dir.min && degree < dir.max)
            ?.fullLabel || 'Unknown'
    );
}

// Function to get Beaufort category from speed (km/h)
export function getBeaufortCategory(speedKmh) {
    return windSpeedBeaufort.find((b) => speedKmh <= b.max);
}
