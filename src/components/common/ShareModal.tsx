import { useEffect, useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import {
  UserPlus,
  X,
  Copy,
  Link,
  Globe,
  Users,
  Eye,
  Edit,
  Check
} from 'lucide-react';
import { toast } from 'sonner';
import axios from 'axios';
import { BASE_URL } from './BaseUrl';

interface ShareModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  token: string,
  fileId: number,
  fileName: string;
  fileType: string;
}

interface Collaborator {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: 'Reader' | 'Editor';
}

export default function ShareModal({ open, onOpenChange, fileName, fileType, token, fileId }: ShareModalProps) {
  const [collaborators, setCollaborators] = useState<Collaborator[]>([

  ]);

  const [newCollaboratorEmail, setNewCollaboratorEmail] = useState('');
  const [shareLink, setShareLink] = useState('');
  const [loading, setLoading] = useState(false);
  const [existingClbtrNumber, setExistingClbtrNumber] = useState(0);
  const [linkGenerated, setLinkGenerated] = useState(false);
  // const [linkSettings, setLinkSettings] = useState({
  //   allowDownload: true,
  //   requirePassword: false,
  //   expiresIn: '7days',
  //   allowComments: false
  // });
  // const [password, setPassword] = useState('');





  const fetchCollaborator = async () => {
    try {
      const getCollaborators = await axios.get(`${BASE_URL}/share-file/get-collaborators/${fileId}`, {
        headers: { "x-auth-token": `Bearer ${token}` },
      })


      console.log(getCollaborators.data.data)
      const collaborators = getCollaborators?.data?.data?.map((collaborator: any) => ({

        id: collaborator.sharedWithUser.id,
        name: collaborator.sharedWithUser.fullName,
        email: collaborator.sharedWithUser.email,
        avatar: collaborator.sharedWithUser.profileUrl,
        role: collaborator.role

      }))
      setCollaborators(collaborators);
      console.log(collaborators)
      if (collaborators.length > 0) {
        setExistingClbtrNumber(collaborators.length)
      }


    } catch (error) {
      console.error(error);
      toast.error('Error fetching collaborators!');

    }
  }


  useEffect(() => {
    if (open) {
      fetchCollaborator()
    }
  }, [open])






  const addCollaborator = async () => {
    if (!newCollaboratorEmail) {
      toast.error('Please enter an email address');
      return;
    }

    // Check if email already exists
    if (collaborators.some(collab => collab.email === newCollaboratorEmail)) {
      toast.error('This user is already a collaborator');
      return;
    }


    try {
      const ifUserExist = await axios.get(`${BASE_URL}/user/read-clbrtr?email=${newCollaboratorEmail}`, {
        headers: { "x-auth-token": `Bearer ${token}` },
      })

      console.log(ifUserExist)

      const newCollaborator: Collaborator = {
        id: ifUserExist.data.data.id,
        name: ifUserExist.data?.data?.fullName,
        email: newCollaboratorEmail,
        role: 'Reader',
        avatar: ifUserExist.data.data.profileUrl
      };

      setCollaborators(prev => [...prev, newCollaborator]);
      setNewCollaboratorEmail('');
      toast.success('Collaborator added successfully');

    } catch (error: any) {
      toast.error(error.response.data.message || 'Failed to add collaborator');
      console.log("error ", error.response.data.message)
    }


  };

  const updateCollaboratorRole = (collaboratorId: string, role: 'Reader' | 'Editor') => {
    setCollaborators(prev =>
      prev.map(collab =>
        collab.id === collaboratorId ? { ...collab, role } : collab
      )
    );
    toast.success('Permission updated');
  };

  // const removeCollaborator = (collaboratorId: string) => {
  //   setCollaborators(prev => prev.filter(collab => collab.id !== collaboratorId));
  //   toast.success('Collaborator removed');
  // };
  const removeCollaborator = (collaboratorId: string) => {
    setCollaborators(prev => {
      const updated = prev.filter(collab => collab.id !== collaboratorId);
      console.log('After removal:', updated); // Debug line
      return [...updated]; // Return a *new array* reference
    });
    toast.success('Collaborator removed');
  };


  const generateShareLink = async () => {
    // Generate a mock share link
    try {
      setLoading(true)
      // const baseUrl = window.location.origin;
      // const linkId = Math.random().toString(36).substring(2, 15);
      // const generatedLink = `${baseUrl}/shared/${linkId}`;
      const sevenDaysMs = 7 * 24 * 60 * 60 * 1000;
      // setShareLink(generatedLink);
      // setLinkGenerated(true);
      const expireDate = new Date(Date.now() + sevenDaysMs).toISOString();
      const linkResponse = await axios.post(`${BASE_URL}/file/share-link`, {
        fileId: fileId,
        expireAt: expireDate,

      }, {
        headers: {
          'Content-Type': 'application/json',
          "x-auth-token": `Bearer ${token}`
        }
      })

      if (!linkResponse.data?.data) {
        toast("Failed to generate share link");
      }

      console.log("link Response", linkResponse.data);
      const baseUrl = window.location.origin;
      setShareLink(`${baseUrl}/view-file/${fileId}?t=${linkResponse.data.data}`);
      setLinkGenerated(true);
      setLoading(false)
      toast.success('Share link generated successfully, it will expire in 7 days');
    } catch (error) {
      // console.error(error);
      toast.error('Failed to generate share link');

    }


  };

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success('Link copied to clipboard!');
    } catch (err) {
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = text;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      toast.success('Link copied to clipboard!');
    }
  };

  // const getRoleIcon = (role: string) => {
  //   switch (role) {
  //     case 'Reader':
  //       return <Eye className="h-3 w-3" />;
  //     case 'Editor':
  //       return <Edit className="h-3 w-3" />;
  //     // case 'admin':
  //     //   return <Shield className="h-3 w-3" />;
  //     default:
  //       return <Eye className="h-3 w-3" />;
  //   }
  // };

  // const getRoleColor = (role: string) => {
  //   switch (role) {
  //     case 'admin':
  //       return 'bg-red-50 text-red-700 dark:bg-red-900/30 dark:text-red-400 border-red-200 dark:border-red-800';
  //     case 'Editor':
  //       return 'bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 border-blue-200 dark:border-blue-800';
  //     case 'Reader':
  //       return 'bg-gray-50 text-gray-700 dark:bg-gray-800 dark:text-gray-300 border-gray-200 dark:border-gray-700';
  //     default:
  //       return 'bg-gray-50 text-gray-700 dark:bg-gray-800 dark:text-gray-300 border-gray-200 dark:border-gray-700';
  //   }
  // };

  const shareFile = async () => {





    if (existingClbtrNumber > 0) {
      try {
        setLoading(true)
        const clbtrData = collaborators.map((data) => ({
          sharedWithUserId: data.id,
          sharedWithUserEmail: data.email,
          role: data.role

        }))
        const updateData = await axios.patch(`${BASE_URL}/share-file/update-shared-file-data`, {
          fileId: fileId,
          collaborators: clbtrData
        }, {
          headers: {
            'Content-Type': 'application/json',
            "x-auth-token": `Bearer ${token}`

          }
        })

        toast.success(updateData.data.message || "File shared data updated successfully");
        setLoading(false)
        onOpenChange(false)
        // toast.success(insertResponse.data.response.data)
      } catch (error: any) {
        console.error(error);
        setLoading(false)
        toast.error(error.response.data.message || 'Failed to update file shared data')

      }

      return
    }

    try {
      setLoading(true)
      const clbtrData = collaborators.map((data) => ({
        sharedWithUserId: data.id,
        sharedWithUserEmail: data.email,
        role: data.role

      }))
      const insertResponse = await axios.post(`${BASE_URL}/share-file/insert`, {
        fileId: fileId,
        collaborators: clbtrData
      }, {
        headers: {
          'Content-Type': 'application/json',
          "x-auth-token": `Bearer ${token}`

        }
      })

      toast.success(insertResponse.data.message || "File shared successfully.....");
      setLoading(false)
      onOpenChange(false)
      // toast.success(insertResponse.data.response.data)
    } catch (error: any) {
      console.error(error);
      setLoading(false)
      toast.error(error.response.data.message || 'Failed to share file')

    }
  }




  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Share "{fileName}"
          </DialogTitle>
          <DialogDescription>
            Add collaborators or create a shareable link for this {fileType}.
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="collaborators" className="w-full">
          <TabsList className="grid grid-cols-2 w-full">
            <TabsTrigger value="collaborators">
              <Users className="mr-2 h-4 w-4" />
              Collaborators
            </TabsTrigger>
            <TabsTrigger value="link">
              <Link className="mr-2 h-4 w-4" />
              Share Link
            </TabsTrigger>
          </TabsList>

          <TabsContent value="collaborators" className="space-y-4 mt-4">
            {/* Add Collaborator */}
            <div className="space-y-2">
              <Label>Add people</Label>
              <div className="flex gap-2">
                <Input
                  placeholder="Enter email address..."
                  value={newCollaboratorEmail}
                  onChange={(e) => setNewCollaboratorEmail(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && addCollaborator()}
                />
                <Button onClick={addCollaborator} size="sm">
                  <UserPlus className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Collaborators List */}
            <div className="space-y-2">
              <Label>People with access ({collaborators.length})</Label>
              <ScrollArea className="h-64 border rounded-lg p-3">
                <div className="space-y-3">
                  {collaborators.map((collaborator) => (
                    <div key={collaborator.id} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={collaborator.avatar} />
                          <AvatarFallback className="text-sm">
                            {collaborator.name.charAt(0).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium text-sm">{collaborator.name}</p>
                          <p className="text-xs text-muted-foreground">{collaborator.email}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Select
                          value={collaborator.role}
                          onValueChange={(role: 'Reader' | 'Editor') =>
                            updateCollaboratorRole(collaborator.id, role)
                          }
                        >
                          <SelectTrigger className="w-28 h-8">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Reader">
                              <div className="flex items-center gap-2">
                                <Eye className="h-3 w-3" />
                                Read
                              </div>
                            </SelectItem>
                            <SelectItem value="Editor">
                              <div className="flex items-center gap-2">
                                <Edit className="h-3 w-3" />
                                Write
                              </div>
                            </SelectItem>
                            {/* <SelectItem value="admin">
                              <div className="flex items-center gap-2">
                                <Shield className="h-3 w-3" />
                                Admin
                              </div>
                            </SelectItem> */}
                          </SelectContent>
                        </Select>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeCollaborator(collaborator.id)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </div>
          </TabsContent>

          <TabsContent value="link" className="space-y-4 mt-4">
            {/* Generate Link Section */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-base">Share via link</Label>
                  <p className="text-sm text-muted-foreground">
                    Anyone with the link can access this file
                  </p>
                </div>
                {!linkGenerated ? (
                  <Button onClick={generateShareLink} disabled={loading}>
                    <Globe className="mr-2 h-4 w-4" />
                    Generate Link
                  </Button>
                ) : (
                  <Badge variant="outline" className="bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-400 border-green-200 dark:border-green-800">
                    <Check className="mr-1 h-3 w-3" />
                    Link Active
                  </Badge>
                )}
              </div>

              {linkGenerated && (
                <div className="space-y-3">
                  <div className="flex gap-2">
                    <Input
                      value={shareLink}
                      readOnly
                      className="font-mono text-sm"
                    />
                    <Button
                      variant="outline"
                      onClick={() => copyToClipboard(shareLink)}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>

                  <Separator />

                  {/* Link Settings */}
                  {/* <div className="space-y-4">
                    <Label className="text-base">Link settings</Label>
                    
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <Label htmlFor="allowDownload" className="text-sm">Allow download</Label>
                          <p className="text-xs text-muted-foreground">
                            Let people download the file
                          </p>
                        </div>
                        <Switch
                          id="allowDownload"
                          checked={linkSettings.allowDownload}
                          onCheckedChange={(checked) => 
                            setLinkSettings(prev => ({ ...prev, allowDownload: checked }))
                          }
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <Label htmlFor="allowComments" className="text-sm">Allow comments</Label>
                          <p className="text-xs text-muted-foreground">
                            Let people add comments to the file
                          </p>
                        </div>
                        <Switch
                          id="allowComments"
                          checked={linkSettings.allowComments}
                          onCheckedChange={(checked) => 
                            setLinkSettings(prev => ({ ...prev, allowComments: checked }))
                          }
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <Label htmlFor="requirePassword" className="text-sm">Require password</Label>
                          <p className="text-xs text-muted-foreground">
                            Add password protection to the link
                          </p>
                        </div>
                        <Switch
                          id="requirePassword"
                          checked={linkSettings.requirePassword}
                          onCheckedChange={(checked) => 
                            setLinkSettings(prev => ({ ...prev, requirePassword: checked }))
                          }
                        />
                      </div>

                      {linkSettings.requirePassword && (
                        <div className="space-y-2">
                          <Label htmlFor="password">Password</Label>
                          <Input
                            id="password"
                            type="password"
                            placeholder="Enter password..."
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                          />
                        </div>
                      )}

                      <div className="space-y-2">
                        <Label htmlFor="expiresIn">Link expires</Label>
                        <Select
                          value={linkSettings.expiresIn}
                          onValueChange={(value) => 
                            setLinkSettings(prev => ({ ...prev, expiresIn: value }))
                          }
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="1hour">1 hour</SelectItem>
                            <SelectItem value="1day">1 day</SelectItem>
                            <SelectItem value="7days">7 days</SelectItem>
                            <SelectItem value="30days">30 days</SelectItem>
                            <SelectItem value="never">Never</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div> */}
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>

        <Separator />

        <div className="flex justify-between items-center">
          <div className="text-sm text-muted-foreground">
            {collaborators.length} collaborators • {linkGenerated ? 'Link active' : 'No link generated'}
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button onClick={shareFile}>
              Done
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}