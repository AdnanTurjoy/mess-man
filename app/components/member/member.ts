export interface User {
	_id: string;
	name: string;
	email: string;
	__v?: number;
  }
  
 export interface Member {
	_id: string;
	name: string;
	phoneNumber: string;
	fbAccount?: string; // Optional, since one object has an empty string for fbAccount
	nidNumber: string;
	permanentAddress: string;
	__v?: number;
	user?: User; // Optional, as not all members have a `user` property
  }