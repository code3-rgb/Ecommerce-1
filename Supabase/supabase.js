
const supabaseUrl = process.env.PROJECT_URL
const supabaseKey = process.env.SERVICE_ROLE
const { createClient } = require('@supabase/supabase-js')

const supabase = createClient(supabaseUrl, supabaseKey)


const DownloadImg = async ()=>{
    const { data, error } = await supabase
    .storage
    .from('products')
    .download('public/finalYear.jpg')
    if(error !== null) {
        console.log(error.message)
        return
    }
    return data
}


const SupabaseUpload = async (files) =>{
    console.log(files)
    const { data,error } = await supabase.storage
    .from("products")
    .upload("public/new.jpeg",new Buffer.from(files.image.data.data), {
      cacheControl:'3600',
      upsert: false,
      contentType: "image/jpeg",
    })

    if (error !== null) {
      console.log(error.message)
    }
    if(data) {
      console.log("File upload success!")
      console.log(data)
    }
}





module.exports = {
    SupabaseUpload: SupabaseUpload,
    DownloadImg: DownloadImg,
}