export type Location = {
	name: string;
	region: string;
	latitude: number;
	longitude: number;
};

export type LandingZone = {
	id: string;
	full_name: string;
	status: 'active' | 'retired' | 'under construction';
	location: Location;
	landing_type: 'RTLS' | 'ASDS'; // RTLS: Return to Launch Site, ASDS: Autonomous Spaceport Drone Ship
	attempted_landings: number;
	successful_landings: number;
	wikipedia: string;
	details: string;
};
