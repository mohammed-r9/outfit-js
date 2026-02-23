import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { useAtom } from "jotai"
import { isAuth } from "@/lib/authStore"
import { useNavigate } from "react-router-dom"

type Props = {}
const credentials = { username: "admin", password: "admin" }

export default function Login({ }: Props) {
	const navigate = useNavigate()
	const [form, setForm] = useState({
		username: "",
		password: "",
	})
	const [error, setError] = useState<string | null>(null)
	const [isAuthed, setIsAuthed] = useAtom(isAuth)
	if (isAuthed) navigate("/", { replace: true })


	function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
		const { name, value } = e.target
		setForm((prev) => ({
			...prev,
			[name]: value,
		}))
	}

	function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault()
		if (form.username !== credentials.username || form.password !== credentials.password) {
			setError("بيانات الدخول غير صحيحة")
		}
		sessionStorage.setItem("auth", "true")
		setIsAuthed(true)
		navigate("/", { replace: true })
	}

	return (
		<div className="min-h-screen flex items-center justify-center bg-muted/40">
			<form onSubmit={handleSubmit} className="w-full max-w-sm">
				<Card>
					<CardHeader>
						<CardTitle className="text-center">تسجيل الدخول</CardTitle>
					</CardHeader>

					<CardContent className="space-y-4">
						<div className="space-y-2">
							<Label htmlFor="username">اسم المستخدم</Label>
							<Input
								id="username"
								name="username"
								value={form.username}
								onChange={handleChange}
								required
							/>
						</div>

						<div className="space-y-2">
							<Label htmlFor="password">كلمة المرور</Label>
							<Input
								id="password"
								name="password"
								type="password"
								value={form.password}
								onChange={handleChange}
								required
							/>
						</div>
						<p className="text-destructive text-sm">{error}</p>
						<Button type="submit" className="w-full">
							دخول
						</Button>
					</CardContent>
				</Card>
			</form>
		</div>
	)
}
