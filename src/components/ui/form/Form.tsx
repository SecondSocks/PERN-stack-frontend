import { Dispatch, SetStateAction, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import styles from './Form.module.scss'

interface IData {
	email: string
	name: string
}

export function Form({setIsSuccess}: {setIsSuccess: Dispatch<SetStateAction<boolean>>}) {
	const { register, handleSubmit, formState, reset  } = useForm<IData>({
		mode: 'onChange',
	})
	const [isLoading, setIsLoading] = useState(false)

	const onSubmit: SubmitHandler<IData> = data => {
		setIsLoading(true)
		fetch('http://localhost:4200/api', {
			method: 'POST',
			headers: {
				'Content-type': 'application/json'
			},
			body: JSON.stringify(data)
		})
		.then(response => response.json())
		.then(data => {
			if (!data) return
			setIsSuccess(true)
			reset() 
		})
		.finally(() => setIsLoading(false))
		
	}

	const emailError = formState.errors['email']?.message
	const nameError = formState.errors['name']?.message

	return (
	<div className={styles.wrapper}>
		<form onSubmit={handleSubmit(onSubmit)}>
			<h1 className={styles.title}>GTA VI - Оставь заявку</h1>
			<input 
				className={styles.input} 
				type='email' 
				placeholder='Введите Email:'
				{...register('email', {
					required: 'Это поле обязательно',
					pattern: {
						value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
						message: 'Некорректный email'
					}
				})} 
			/>
			{emailError && <p className='text-md text-[#e60024] pt-1 m-0 block'>{emailError}</p>}
			<input 
				className={styles.input} 
				type='text' 
				placeholder='Введите имя:'
				{...register('name', {
					required: 'Это поле обязательно'
				})} 
			/>
			{nameError && <p className='text-md text-[#e60024] block'>{nameError}</p>}
			<button type='submit' disabled={isLoading}>
				{isLoading ? 'Отправка...' : 'Отправить'}
			</button>
		</form>
	</div>
	)
}
