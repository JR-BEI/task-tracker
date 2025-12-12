import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://ipyxvlkjdkxxydhxkncw.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlweXh2bGtqZGt4eHlkaHhrbmN3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQxNDgyODYsImV4cCI6MjA3OTcyNDI4Nn0.Wu4m0TGvHa0QBwWsCfGw_05muADuIyXAHaYaO9Atm9U'

const supabase = createClient(supabaseUrl, supabaseAnonKey)

async function getAllTasks() {
  const { data, error } = await supabase
    .from('tasks')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching tasks:', error)
    process.exit(1)
  }

  console.log('All tasks in database:')
  console.log(JSON.stringify(data, null, 2))
  console.log(`\nTotal tasks: ${data?.length || 0}`)
}

getAllTasks()
