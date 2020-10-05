import React, { useState, FormEvent } from 'react';
import PageHeader from '../../components/PageHeader';
import Input from '../../components/Input';
import Select from '../../components/Select';
import TeacherItem, { Teacher } from '../../components/TeacherItem';

import api from '../../services/api';
import './styles.css';

function TeacherList() {
	const [
		teachers,
		setTeachers
	] = useState([]);
	const [
		subject,
		setSubject
	] = useState('');
	const [
		week_day,
		setWeekDay
	] = useState('');
	const [
		time,
		setTime
	] = useState('');

	async function searchTeachers(e: FormEvent) {
		e.preventDefault();
		const response = await api.get('classes', {
			params: {
				week_day,
				subject,
				time
			}
		});
		setTeachers(response.data);
	}
	return (
		<div id="page-teacher-list" className="container">
			<PageHeader title="Estes sãos os proofys disponíveis">
				<form id="search-teachers" onSubmit={searchTeachers}>
					<Select
						name="subject"
						label="Matéria"
						value={subject}
						onChange={(e) => {
							setSubject(e.target.value);
						}}
						options={[
							{ value: 'Artes', label: 'Artes' },
							{ value: 'Biologia', label: 'Biologia' },
							{ value: 'Ciências', label: 'Ciências' },
							{ value: 'Educação Física', label: 'Educação Física' },
							{ value: 'Geografia', label: 'Geografia' }
						]}
					/>
					<Select
						name="week-day"
						label="Dia da Semana"
						value={week_day}
						onChange={(e) => {
							setWeekDay(e.target.value);
						}}
						options={[
							{ value: '0', label: 'domingo' },
							{ value: '1', label: 'segunda-feira' },
							{ value: '2', label: 'terça-feira' },
							{ value: '3', label: 'quarta-feira' },
							{ value: '4', label: 'quinta-feira' },
							{ value: '5', label: 'sexta-feira' },
							{ value: '6', label: 'sábado' }
						]}
					/>
					<Input
						type="time"
						name="time"
						label="Hora"
						value={time}
						onChange={(e) => {
							setTime(e.target.value);
						}}
					/>
					<button type="submit">Buscar</button>
				</form>
			</PageHeader>
			<main>
				{teachers.map((teacher: Teacher) => {
					return <TeacherItem teacher={teacher} key={teacher.id} />;
				})}
			</main>
		</div>
	);
}

export default TeacherList;
