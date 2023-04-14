import { Clock } from './clock/Clock';
import { Chat } from './chat/Chat';
import { User } from './user/User';

export function TopbarCustom() {
	return (
		<div className="topbar-custom d-flex align-items-stretch flex-shrink-0">
			<div className="topbar-custom-item d-flex align-items-center">
				<Clock/>
			</div>
			<div className="topbar-custom-item d-flex align-items-center">
				<Chat/>
			</div>
			<div className="topbar-custom-item d-flex align-items-center">
				<User/>
			</div>
		</div>
	);
}