
import { useDispatch } from "react-redux";
import { setAuthInfo } from "@/store/slices/auth.slice";
import { clearToken } from "@/app/(auth)/Server/auth.Actions";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";


export default function useLogout() {
  const router = useRouter();
  const dispatch = useDispatch()
  const logout = async () => {
    await clearToken()


    dispatch(setAuthInfo({ isAuthenticated: false, userInfo: null }))
    toast.success('logged out successfully')
    router.push("/login")

    router.refresh()
  }
  return { logout }
}