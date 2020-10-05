import React, { useState, FormEvent } from 'react';
import { useHistory } from 'react-router-dom';
import PageHeader from '../../components/PageHeader';
import Input from '../../components/Input';
import warningIcon from '../../assets/images/icons/warning.svg';
import Textarea from '../../components/textarea';
import Select from '../../components/Select';
import api from '../../services/api';
import './styles.css';

function TeacherForm() {
	const history = useHistory();
	//o react so fica observando a variável se usarmos o conceito de state
	// o useState passa um array onde o primeiro item são os dados
	// fazemos uma desestruturação da variável scheduleItems para [scheduleItems]
	// AS VARIÁVEIS CRIADAS NO REACT NÃO SÃO MODIFICÁVEIS

	const [
		name,
		setName
	] = useState('');
	const [
		avatar,
		setAvatar
	] = useState('');
	const [
		whatsapp,
		setWhatsapp
	] = useState('');
	const [
		bio,
		setBio
	] = useState('');
	const [
		subject,
		setSubject
	] = useState('');
	const [
		cost,
		setCost
	] = useState('');
	const [
		scheduleItems,
		setScheduleItems
	] = useState([
		{ week_day: 0, from: '', to: '' }
	]);

	function addNewScheduleItem() {
		setScheduleItems([
			...scheduleItems,
			{ week_day: 0, from: '', to: '' }
		]);
	}

	function setScheduleItemValue(position: number, field: string, value: string) {
		// o map mapeia o array, ou seja retorna sempre um array da mesma dimensão com as alterações aplicadas

		// setScheduleItemValue(0, 'week_day', '2')
		const updatedScheduleItems = scheduleItems.map((scheduleItem, index) => {
			if (index === position) {
				return { ...scheduleItem, [field]: value };
			}
			return scheduleItem;
		});

		setScheduleItems(updatedScheduleItems);
	}

	function handleCreateClass(e: FormEvent) {
		e.preventDefault();
		api
			.post('/classes', {
				name,
				avatar,
				whatsapp,
				bio,
				subject,
				cost: Number(cost),
				schedule: scheduleItems
			})
			.then(() => {
				alert('guardado com sucesso');
				history.push('/');
			})
			.catch(() => {
				alert('erro no registo');
			});
		console.log({ name, avatar, whatsapp, subject, bio, cost, scheduleItems });
	}

	return (
		<div id="page-teacher-form" className="container">
			<PageHeader
				title="Que incrível que você quer dar aulas"
				description="O primeiro passo: preencha o formulário de inscrição"
			/>
			<main>
				<form onSubmit={handleCreateClass}>
					<fieldset>
						<legend>Os seus dados</legend>
						<Input
							name="name"
							label="Nome Completo"
							value={name}
							onChange={(e) => {
								setName(e.target.value);
							}}
						/>
						<Input
							name="avatar"
							label="Avatar"
							value={avatar}
							onChange={(e) => {
								setAvatar(e.target.value);
							}}
						/>
						<Input
							name="whatsapp"
							label="WhatsApp"
							value={whatsapp}
							onChange={(e) => {
								setWhatsapp(e.target.value);
							}}
						/>
						<Textarea
							name="bio"
							label="biografia"
							value={bio}
							onChange={(e) => {
								setBio(e.target.value);
							}}
						/>
					</fieldset>
					<fieldset>
						<legend>Sobre a aula</legend>
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
								{ value: 'Educação Física', label: 'Educação Física~' },
								{ value: 'Geografia', label: 'Geografia' }
							]}
						/>
						<Input
							name="cost"
							label="Custo da sua hora por aula"
							value={cost}
							onChange={(e) => {
								setCost(e.target.value);
							}}
						/>
					</fieldset>
					<fieldset>
						<legend>
							Horários Disponíveis
							<button type="button" onClick={addNewScheduleItem}>
								+ Novo Horário
							</button>
						</legend>
						{scheduleItems.map((scheduleItem, i) => {
							return (
								<div className="schedule-item" key={scheduleItem.week_day}>
									<Select
										name="week-day"
										label="Dia da Semana"
										value={scheduleItem.week_day}
										onChange={(e) => setScheduleItemValue(i, 'week_day', e.target.value)}
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
										name="from"
										label="Das"
										type="time"
										value={scheduleItem.from}
										onChange={(e) => setScheduleItemValue(i, 'from', e.target.value)}
									/>
									<Input
										name="to"
										label="Até"
										type="time"
										value={scheduleItem.to}
										onChange={(e) => setScheduleItemValue(i, 'to', e.target.value)}
									/>
								</div>
							);
						})}
					</fieldset>
					<footer>
						<p>
							<img src={warningIcon} alt="Aviso Importante" />
							Importante! <br />
							Preencha todos os dados
						</p>
						<button type="submit">Gravar</button>
					</footer>
				</form>
			</main>
		</div>
	);
}

export default TeacherForm;
