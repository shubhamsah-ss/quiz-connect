import ProfileForm from '@/components/form/ProfileForm'
import ChangePassword from '@/components/frontend/ChangePassword'
import { UserType } from '@/types/user'

const Profile = ({ user }: { user: UserType | null}) => {

    return (
        <div className="w-full max-w-7xl mx-auto rounded-none md:rounded-2xl p-4 md:p-8 bg-white dark:bg-black space-y-10">
            <ProfileForm user={user} />
            {!user?.isOAuth && <ChangePassword />}
        </div>
    )
}

export default Profile