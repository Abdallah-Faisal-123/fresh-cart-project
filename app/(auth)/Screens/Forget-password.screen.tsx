import ForgetPasswordForm from '../components/ForgetPasswordForm/ForgetPasswordForm'

export default function ForgetPasswordScreen() {
  return (
    <section id="forgot-password-section" className="min-h-screen py-8 md:py-12 lg:py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Mobile/Tablet Layout - Stack Vertically */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 lg:gap-12 items-center max-w-7xl mx-auto">
          {/* Left Side - Illustration (Hidden on mobile, shown on lg) */}
          <div className="hidden lg:block">
            <ForgetPasswordForm showIllustration={true} />
          </div>

          {/* Right Side - Form (Full width on mobile, half on desktop) */}
          <div>
            <ForgetPasswordForm showIllustration={false} />
          </div>

          {/* Mobile Only - Illustration below form */}
          <div className="lg:hidden col-span-1">
            <ForgetPasswordForm showIllustration={true} />
          </div>
        </div>
      </div>
    </section>
  )
}
