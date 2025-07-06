 import { supabase } from './supabase'

/** Save session tokens to localStorage */
export const saveSessionToLocalStorage = (session) => {
  if (!session) return
  localStorage.setItem('access_token', session.access_token)
  localStorage.setItem('refresh_token', session.refresh_token)
  localStorage.setItem('expires_at', session.expires_at)
  localStorage.setItem('user', JSON.stringify(session.user))
}

/** Remove session tokens */
const clearSessionFromLocalStorage = () => {
  localStorage.removeItem('access_token')
  localStorage.removeItem('refresh_token')
  localStorage.removeItem('expires_at')
  localStorage.removeItem('user')
}

/** --------- EMAIL SIGN UP --------- */
export const signUpWithEmail = async (email, password) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  })
  if (error) throw error
  return data
}

/** --------- EMAIL SIGN IN --------- */
export const signInWithEmail = async (email, password) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })
  if (error) throw error
  saveSessionToLocalStorage(data.session)
  return data
}

/** --------- GOOGLE SIGN IN --------- */
export const signInWithGoogle = async () => {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: window.location.origin,
    },
  })
  if (error) throw error
  return data // Session will be caught in listener after redirect
}

/** --------- GITHUB SIGN IN --------- */
export const signInWithGitHub = async () => {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'github',
    options: {
      redirectTo: window.location.origin,
    },
  })
  if (error) throw error
  return data
}

/** --------- SIGN OUT --------- */
export const signOut = async () => {
  const { error } = await supabase.auth.signOut()
  if (error) throw error
  clearSessionFromLocalStorage()
  return true
}

/** --------- LISTENER FOR SESSION CHANGES --------- */
supabase.auth.onAuthStateChange((event, session) => {
  if (event === 'SIGNED_IN' && session) {
    saveSessionToLocalStorage(session)
  } else if (event === 'SIGNED_OUT') {
    clearSessionFromLocalStorage()
  }
})

