import React from 'react';
import api from '../../services/api';
import whatsappIcon from '../../assets/images/icons/whatsapp.svg';
import './styles.css';

export interface Teacher {
	avatar: string;
	bio: string;
	cost: number;
	id: number;
	name: string;
	subject: string;
	whatsapp: string;
}

interface TeacherItemProps {
	teacher: Teacher;
}

const TeacherItem: React.FC<TeacherItemProps> = ({ teacher }) => {
	function createNewConnection() {
		api.post('/connections', {
			user_id: teacher.id
		});
	}
	return (
		<article className="teacher-item">
			<header>
				<img src={teacher.avatar} alt={teacher.name} />
				<div>
					<strong>{teacher.name}</strong>
					<span>{teacher.subject}</span>
				</div>
			</header>
			<p>{teacher.bio}</p>
			<footer>
				<p>
					preço/hora
					<strong>€{teacher.cost}</strong>
				</p>
				<a
					href={'https://wa.me/' + teacher.whatsapp}
					onClick={createNewConnection}
					target="_blank"
					rel="noreferrer noopener"
				>
					<img src={whatsappIcon} alt="WhatsApp" />
					Entrar em contacto
				</a>
			</footer>
		</article>
	);
};

export default TeacherItem;
