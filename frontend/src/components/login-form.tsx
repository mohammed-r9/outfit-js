import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { useAtom } from "jotai"
import { isAuth } from "@/lib/authStore"
import { useNavigate } from "react-router-dom"
import { Eye, EyeOff, Shirt } from "lucide-react"

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
	const [isPasswordShown, setIsPasswordShown] = useState(false)
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
			return
		}
		sessionStorage.setItem("auth", "true")
		setIsAuthed(true)
		navigate("/", { replace: true })
	}

	return (
		<div className="min-h-screen flex" dir="rtl">
			{/* Left side — branding */}
			<div className="hidden lg:flex w-1/2 bg-primary flex-col items-center justify-center gap-6 p-12 text-primary-foreground rounded-tl-full">
				<Shirt className="w-24 h-24 opacity-90" strokeWidth={1.5} />
				<h1 className="text-4xl font-bold text-center leading-snug">
					مرحباً بك في<br />نظام إدارة الإطلالات
				</h1>
			</div>

			<div className="flex w-full lg:w-1/2 items-center justify-center p-8">
				<form onSubmit={handleSubmit} className="w-full max-w-sm space-y-6">
					<div className="space-y-1 text-center">
						<h2 className="text-2xl font-bold">تسجيل الدخول</h2>
						<p className="text-muted-foreground text-sm">أدخل بيانات حسابك للمتابعة</p>
					</div>

					<div className="space-y-4">
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

						<div className="space-y-2 relative">
							<Label htmlFor="password">كلمة المرور</Label>
							<Input
								id="password"
								name="password"
								type={isPasswordShown ? "text" : "password"}
								value={form.password}
								onChange={handleChange}
								required
							/>
							<Button type="button" variant={"ghost"}
								className="absolute left-0 hover:bg-background/0"
								onClick={() => setIsPasswordShown(prev => !prev)}>
								{
									isPasswordShown ? <Eye /> : <EyeOff />
								}
							</Button>
						</div>

						{error && <p className="text-destructive text-sm">{error}</p>}

						<Button type="submit" className="w-full">
							دخول
						</Button>
					</div>
				</form>
			</div>
		</div>
	)
}
