import { useEffect, useState } from 'react'

function VaultPage() {
	const [user, setUser] = useState(null)
	const [message, setMessage] = useState('Chargement...')
	const [isError, setIsError] = useState(false)

	useEffect(() => {
		const loadUser = async () => {
			try {
				const response = await fetch('/api/user', {
					credentials: 'include',
				})

				let body = {}
				try {
					body = await response.json()
				} catch {
					body = {}
				}

				if (!response.ok) {
					throw new Error(body.message || 'Session invalide')
				}

				setUser(body)
				setMessage('Connexion validee')
				setIsError(false)
			} catch (error) {
				setMessage(error.message)
				setIsError(true)
				window.setTimeout(() => {
					window.location.assign('/')
				}, 1200)
			}
		}

		loadUser()
	}, [])

	return (
		<main>
			<section className='hero-card vault-card'>
				<h2>Espace securise</h2>
				<p>{message}</p>
				{user && (
					<p className='vault-user'>Connecte en tant que {user.name}</p>
				)}
				{isError && <p className='login-status error'>Redirection vers la page de connexion...</p>}
			</section>
		</main>
	)
}

export default VaultPage
