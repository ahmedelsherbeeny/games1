export interface Game{
    id:any
    background_image:any
    name:string
    released:string
    metacritic_url:string
    website:string
    description:string
    metacritic:number
    genres:Array<Genre>
    parent_platforms:Array<ParentPlatform>
    publishers:Array<Publishers>
    ratings:Array<Rating>
    screenshots:Array<ScreenShots>
    trailers:Array<Trailer>
}



export interface APIResponse<T>{
    results:Array<T>
}
interface Genre{
    name:string
}
interface ParentPlatform{
    platform:{
        name:string
    }
}

interface Publishers{
    name:string
}
interface Rating{
    id:number
    count:number
    title:string
}
interface ScreenShots{
    image:string
}
interface Trailer{
    data:{
        max:string
    }
}
