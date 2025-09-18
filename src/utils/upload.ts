import { supabase } from '../supabaseClient'

export async function uploadAvatar(file: File) {
  const fileName = `${Date.now()}_${file.name}`
  const { data, error } = await supabase.storage.from('avatars').upload(fileName, file)
  if (error) throw error
  const { data: publicData } = await supabase.storage.from('avatars').getPublicUrl(fileName)
  return publicData.publicUrl
}
