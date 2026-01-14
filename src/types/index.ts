import { Types } from 'mongoose';

export enum UserRole {
	USER = 'user',
	ADMIN = 'admin'
}

export enum NotificationsStatus {
	UNREAD = 'unread',
	READ = 'read'
}

export interface Base {
	createdAt: Date;
	updatedAt: Date;
	deletedAt: Date;
}

export interface IUser extends Base {
	_id: string;
	username: string;
	password: string;
	email: string;
	role: UserRole;
}

export interface IUserLogin {
	email: string;
	password: string;
}

export interface IUserSignUp {
	username: string;
	email: string;
	password: string;
	role: UserRole;
}

export interface JwtPayload {
	user_id: string;
	role?: UserRole;
}
export type TransactionType = 'credit' | 'debit';

export interface ITransaction {
	_id?: string;
	type: TransactionType;
	amount: number;
	reference?: string;
	createdAt?: Date;
}

export interface IWallet extends Base {
	_id?: string;
	userId: string;
	balance: number;
	currency?: string;
	transactions?: ITransaction[];
}

export type CallStatus = 'initiated' | 'ongoing' | 'ended' | 'failed';

export interface ICallSession extends Base {
	_id?: string;
	sessionId: string;
	callerId: string;
	calleeId: string;
	status: CallStatus;
	startedAt?: Date;
	endedAt?: Date;
	metadata?: any;
}
