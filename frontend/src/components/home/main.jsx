import { useState } from 'react'

function Main() {
	const [password, setPassword] = useState('')
	const [message, setMessage] = useState('')
	const [isError, setIsError] = useState(false)

	const handleSubmit = async (event) => {
		event.preventDefault()
		setMessage('Connexion...')
		setIsError(false)

		try {
			const response = await fetch('/api/login', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				credentials: 'include',
				body: JSON.stringify({ password }),
			})

			let body = { message: 'Connexion impossible' }
			try {
				body = await response.json()
			} catch {
				body = { message: 'Reponse serveur invalide' }
			}

			if (!response.ok) {
				throw new Error(body.message || 'Connexion impossible')
			}

			setMessage('Connexion reussie')
			setIsError(false)
			window.setTimeout(() => {
				window.location.assign('/vault')
			}, 350)
		} catch (error) {
			setMessage(error.message)
			setIsError(true)
		}
	}

	return (
		<main>
			<section className='hero-card'>
				<h2>Bienvenue sur Lockbox</h2>
				<p>Entrez votre mot de passe pour continuer.</p>
				<form className='password-form' onSubmit={handleSubmit}>
					<input
						type='password'
						name='password'
						placeholder='Mot de passe'
						autoComplete='current-password'
						value={password}
						onChange={(event) => setPassword(event.target.value)}
						required
					/>
					<button className='login-btn' type='submit'>
						Continuer
					</button>
				</form>
				{message && <p className={isError ? 'login-status error' : 'login-status'}>{message}</p>}
			</section>
		</main>
	)
}

export default Main
