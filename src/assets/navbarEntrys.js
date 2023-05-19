import { GithubIcon } from '@/components/icons/navbar/Github'
import { MessageIcon } from '@/components/icons/navbar/Message'
import { PersonIcon } from '@/components/icons/navbar/Person'
import { SavedIcon } from '@/components/icons/navbar/Saved'

export const entrys = [
  { title: 'Profile', icon: PersonIcon },
  { title: 'Github', icon: GithubIcon, href: 'https://github.com/yonext24/twitter-clone' },
  { title: 'Messages', icon: MessageIcon },
  { title: 'Bookmarks', clickable: true, icon: SavedIcon, href: '/bookmarked' }
]
export const options = [
  { title: 'Creator Studio' },
  { title: 'Professional Tools' },
  { title: 'Settings and Support' }
]
