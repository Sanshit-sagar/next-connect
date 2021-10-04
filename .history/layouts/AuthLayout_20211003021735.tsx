import authbg from '../public/images'

export function AuthLayout({ 
    children 
}: { 
    children: React.ReactNode 
}) {
    return (
      <div className="container">
        <div className="sidebar">{children}</div>
        <Image 
            src={authbg}
            alt={'Authentication Screen'}
            height={'100vh'}
            width={'1000px'}
        /> 
      </div>
    );
}