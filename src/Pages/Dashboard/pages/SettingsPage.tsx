import { useContext, useEffect, useState } from 'react';
import MemberCard from '../components/MemberCard';
import { Input } from 'src/Components/ui/input';
import { Button } from 'src/Components/ui/button';
import {
  banMemberFromBoard,
  removeMemberFromBoard,
  revokeUserBan,
  updateOrganizationName,
  updateOrganizationPassword,
} from 'src/api/requests';
import { useToast } from 'src/Components/Toaster/use-toast';
import { useAuthUser } from 'react-auth-kit';
import { DashboardContext } from '../contexts/DashboardContextProvider';
import { DeleteOrganizationDialog } from '../modals/DeleteOrganizationDialog';
import { Label } from 'src/Components/ui/label';
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from 'src/Components/table';
import { IOrg } from 'src/Interfaces/IContexts';
import { IUserData } from 'src/Interfaces/IUserData';
type Props = {};

export const SettingsPage = (props: Props) => {
  const context = useContext(DashboardContext);
  if (!context) {
    throw new Error('Dashboard context is not available');
  }
  const {
    selectedOrganization,
    setUserOrganizations,
    setSelectedOrganization,
  } = context;

  const { toast } = useToast();

  const [org, setOrg] = useState<IOrg | null>(selectedOrganization);

  const [orgData, setOrgData] = useState({
    name: org?.name,
    password: '',
    oldPassword: '',
  });

  useEffect(() => {
    setOrgData((prevState) => ({
      ...prevState,
      name: selectedOrganization?.name,
    }));
    setOrg(selectedOrganization);
  }, [selectedOrganization]);

  const handleInputChange = (e: any) => {
    setOrgData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const [activeTab, setActiveTab] = useState('members');

  const auth = useAuthUser()();

  const isOwner = auth?._id === selectedOrganization!.owner._id;

  const handleTabClick = (tabId: string) => {
    setActiveTab(tabId);
  };

  const handleUpdateOrganizationName = async () => {
    if (!orgData.name) {
      toast({
        title: 'Name is required',
        variant: 'destructive',
      });
      return;
    }
    try {
      await updateOrganizationName(selectedOrganization!._id, orgData.name);

      toast({
        title: 'Organization updated successfully',
        variant: 'default',
      });
    } catch (err: any) {
      toast({
        title: err.message,
        variant: 'destructive',
      });
    } finally {
      setUserOrganizations((prev: IOrg[]) => {
        return prev.map((org: IOrg) => {
          if (org._id === selectedOrganization!._id) {
            org.name = orgData.name || '';
            return org;
          }
          return org;
        });
      });
    }
  };

  const handleUpdateOrganizationPassword = async () => {
    if (!orgData.password) {
      toast({
        title: 'Password is required',
        variant: 'destructive',
      });
      return;
    }
    if (!orgData.oldPassword) {
      toast({
        title: 'Old password is required',
        variant: 'destructive',
      });
      return;
    }

    try {
      await updateOrganizationPassword(
        selectedOrganization!._id,
        orgData.password,
        orgData.oldPassword
      );

      setOrgData((prevState) => ({
        ...prevState,
        password: '',
        oldPassword: '',
      }));

      toast({
        title: 'Organization updated successfully',
        variant: 'default',
      });
    } catch (err: any) {
      toast({
        title: err.message,
        variant: 'destructive',
      });
    } finally {
    }
  };

  const handleKickMember = async (boardId: string, memberId: string) => {
    try {
      await removeMemberFromBoard(boardId, memberId);
      const newMembers = selectedOrganization!.members.filter(
        (member: IUserData) => member._id !== memberId
      );
      setUserOrganizations((prev: IOrg[]) => {
        return prev.map((org: IOrg) => {
          if (org._id === selectedOrganization!._id) {
            org.members = newMembers;
            return org;
          }
          return org;
        });
      });
      toast({
        title: 'Member removed successfully',
      });
    } catch (e: any) {
      toast({
        title: e.message,
        variant: 'destructive',
      });
    }
  };

  const handleBanMember = async (memberId: string) => {
    try {
      await banMemberFromBoard(context.selectedOrganization?._id, memberId);
      setSelectedOrganization((prevOrg: IOrg | null) => {
        if (!prevOrg) return null;

        const updatedBannedUsers = prevOrg.members.filter(
          (member: IUserData) => member._id === memberId
        );

        const updatedMembers = prevOrg.members.filter(
          (member: IUserData) => member._id !== memberId
        );

        return {
          ...prevOrg,
          members: updatedMembers,
          bannedUsers: [...prevOrg.bannedUsers, ...updatedBannedUsers],
        };
      });
      toast({
        title: 'Member banned successfully',
      });
    } catch (e: any) {
      toast({
        title: e.message,
        variant: 'destructive',
      });
    }
  };

  const removeUserBan = async (memberId: string) => {
    try {
      await revokeUserBan(context.selectedOrganization?._id, memberId);
      setSelectedOrganization((prevOrg: IOrg | null) => {
        if (!prevOrg) return null;

        const updatedBannedUsers = prevOrg.bannedUsers.filter(
          (member: IUserData) => member._id !== memberId
        );

        return {
          ...prevOrg,
          bannedUsers: updatedBannedUsers,
        };
      });
      toast({
        title: 'Ban revoked successfully',
      });
    } catch (e: any) {
      toast({
        title: e.message,
        variant: 'destructive',
      });
    }
  };

  return (
    <div className='border-b border-gray-200 dark:border-gray-700'>
      <ul
        className='flex flex-wrap -mb-px text-sm font-medium text-center'
        role='tablist'
      >
        <li className='flex-grow me-2' role='presentation'>
          <button
            className={`inline-block w-full p-4 border-b-2 rounded-t-lg ${
              activeTab === 'members'
                ? 'border-blue-500 text-blue-500 font-semibold'
                : 'hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300'
            }`}
            id='members-tab'
            data-tabs-target='#members'
            type='button'
            role='tab'
            aria-controls='members'
            aria-selected={activeTab === 'members'}
            onClick={() => handleTabClick('members')}
          >
            <span className='text-lg'>Members</span>
          </button>
        </li>
        <li className='flex-grow me-2' role='presentation'>
          <button
            className={`inline-block w-full p-4 border-b-2 rounded-t-lg ${
              activeTab === 'settings'
                ? 'border-blue-500 text-blue-500 font-semibold'
                : 'hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300'
            }`}
            id='settings-tab'
            data-tabs-target='#settings'
            type='button'
            role='tab'
            aria-controls='settings'
            aria-selected={activeTab === 'settings'}
            onClick={() => handleTabClick('settings')}
          >
            <span className='text-lg'>Settings</span>
          </button>
        </li>
      </ul>

      <div id='default-tab-content'>
        <div
          className={`overflow-y-auto p-2 ${
            activeTab === 'members' ? 'block' : 'hidden'
          }`}
          id='members'
          role='tabpanel'
          aria-labelledby='members-tab'
        >
          <main className='flex flex-col flex-1 gap-4 p-4 md:gap-8 md:p-6'>
            <section>
              <div className='flex items-center'>
                <h2 className='text-xl font-bold'>Members</h2>
              </div>
              <div className='border rounded-lg shadow-sm'>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className='max-w-[150px]'>Name</TableHead>
                      <TableHead className='hidden md:table-cell'>
                        Email
                      </TableHead>
                      <TableHead className='hidden text-center md:table-cell'>
                        Score
                      </TableHead>
                      <TableHead className='hidden md:table-cell'>
                        Role
                      </TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {selectedOrganization?.members.map((member: IUserData) => (
                      <MemberCard
                        isOwner={isOwner}
                        key={member._id}
                        member={member}
                        handleRemoveMember={handleKickMember}
                        selectedOrganization={selectedOrganization!}
                        handleBanMember={handleBanMember}
                        mode='remove'
                        revokeUserBan={removeUserBan}
                      ></MemberCard>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </section>

            <section>
              <div className='flex items-center'>
                <h2 className='text-xl font-bold'>Banned users</h2>
              </div>
              {selectedOrganization?.bannedUsers &&
              selectedOrganization?.bannedUsers?.length > 0 ? (
                <div className='border rounded-lg shadow-sm'>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className='max-w-[150px]'>Name</TableHead>
                        <TableHead className='hidden md:table-cell'>
                          Email
                        </TableHead>
                        <TableHead className='hidden text-center md:table-cell'>
                          Score
                        </TableHead>
                        <TableHead className='hidden md:table-cell'>
                          Role
                        </TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {selectedOrganization?.bannedUsers.map(
                        (member: IUserData) => (
                          <MemberCard
                            isOwner={isOwner}
                            key={member._id}
                            member={member}
                            handleRemoveMember={handleKickMember}
                            selectedOrganization={selectedOrganization!}
                            handleBanMember={handleBanMember}
                            mode='revoke'
                            revokeUserBan={removeUserBan}
                          ></MemberCard>
                        )
                      )}
                    </TableBody>
                  </Table>
                </div>
              ) : (
                <p>No banned users yet!</p>
              )}
            </section>
          </main>
        </div>
        <div
          className={`h-full overflow-y-auto p-2 ${
            activeTab === 'settings' ? 'block' : 'hidden'
          }`}
          id='settings'
          role='tabpanel'
          aria-labelledby='settings-tab'
        >
          {isOwner ? (
            <main className='flex flex-wrap -mx-4'>
              <section
                className='px-4 mb-8'
                id='general'
                style={{ width: '50%' }}
              >
                <h2 className='text-xl font-bold'>General Settings</h2>
                <div className='mt-4 space-y-4'>
                  <div className='space-y-1'>
                    <Label htmlFor='name'>Organization Name</Label>
                    <Input
                      id='name'
                      placeholder='Enter organization name'
                      // value={orgData.name}
                      name='name'
                      value={orgData!.name}
                      onChange={handleInputChange}
                      disabled={!isOwner}
                    />
                  </div>
                  <Button onClick={handleUpdateOrganizationName}>Save</Button>

                  {isOwner && (
                    <div>
                      <DeleteOrganizationDialog />
                    </div>
                  )}
                </div>
              </section>
              <section
                className='px-4 mb-8'
                id='security'
                style={{ width: '50%' }}
              >
                <h2 className='text-xl font-bold'>Security</h2>

                <div className='flex flex-col gap-4'>
                  <div className='mt-4 space-y-4'>
                    <div className='space-y-1'>
                      <Label htmlFor='old-password'>Old Password</Label>
                      <Input
                        name='oldPassword'
                        id='oldPassword'
                        placeholder='Enter оld password'
                        type='password'
                        onChange={handleInputChange}
                        value={orgData.oldPassword}
                      />
                    </div>

                    <div className='space-y-1'>
                      <Label htmlFor='password'>Password</Label>
                      <Input
                        name='password'
                        id='password'
                        placeholder='Enter new password'
                        type='password'
                        onChange={handleInputChange}
                        value={orgData.password}
                      />
                    </div>

                    <Button onClick={handleUpdateOrganizationPassword}>
                      Change Password
                    </Button>
                  </div>
                </div>
              </section>
            </main>
          ) : (
            <div className='flex items-center justify-center flex-1 h-32'>
              <h1 className='text-xl text-red-900'>Forbidden For Members</h1>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
