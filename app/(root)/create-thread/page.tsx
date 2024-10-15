




import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { PlusCircle } from "lucide-react";

import PostThread from "@/components/forms/PostThread";
import { fetchUser } from "@/lib/actions/user.actions";

async function Page() {
  const user = await currentUser();
  if (!user) return null;

  // fetch organization list created by user
  const userInfo = await fetchUser(user.id);
  if (!userInfo?.onboarded) redirect("/onboarding");

  return (
    <>
      <div className="flex items-center justify-between mb-8">
      <div className="flex items-center">
      <img 
    src="/assets/cb.jpeg" 
    alt="Description of the image" 
    className="w-[60px] h-[57px] mr-2" 
  />

  <h1 className="head-text">Create Byte</h1>
</div>

        <div className="flex items-center gap-2 text-primary-500 cursor-pointer">
        <PlusCircle className="w-6 h-6" style={{ color: '#17818c' }} />

          <span className="text-sm font-medium" style={{ color: '#17818c' }}>Add Files</span>

        </div>
      </div>

      <PostThread userId={userInfo._id} />
    </>
  );
}

export default Page;