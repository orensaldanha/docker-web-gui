import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import axios from "axios"
import moment from "moment"

const Container = () => {
    const { imageId } = useParams()
    const navigate = useNavigate();
    const [image, setImge] = useState()
    
    useEffect(() => {
        const getImage = async () => {
            const res = await axios.get(`/images/${imageId}`)
            setImge(res.data)
        }
        getImage()
    }, [imageId])

    const bytesToSize = (bytes) => {
        const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB']
        if (bytes === 0) return 'n/a'
        const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)), 10)
        if (i === 0) return `${bytes} ${sizes[i]})`
        return `${(bytes / (1024 ** i)).toFixed(1)} ${sizes[i]}`
      }


    const removeImage = async (image_id) => {
        //todo -  only images with no containers can be removes or force stopped containers
        const res = await axios.delete(`/images/${image_id}`)
        if(res.status === 204) {
            navigate('/images')
        }
        
    }

    return (
        <div>
            <h1>Image Details</h1>

            {image === undefined ? 
                <div className="spinner-border"></div> 
            :
                <div>
                    <div>
                        <h2>Actions</h2>
                        <button onClick={() => removeImage(image.Id)}>Remove</button>
                    </div>

                    <div className="col-sm-6">

                        <table className="table table-bordered">
                            <thead className="table-dark">
                                <tr>
                                    <th colSpan={2}>Image details</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>ID</td>
                                    <td>{image.Id}</td>
                                </tr>
                                <tr>
                                    <td>Image Tag</td>
                                    <td><mark>{image.RepoTags[0]}</mark></td>
                                </tr>
                                <tr>
                                    <td>Size</td>
                                    <td>{bytesToSize(image.Size)}</td>
                                </tr>
                                <tr>
                                    <td>Created</td>
                                    <td>{moment(image.Created).format("YYYY-MM-DD HH:mm:ss")}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    {image.Config.Cmd !== null && 
                        <div className="col-sm-6">
                            <table className="table table-bordered">
                                <thead className="table-dark">
                                    <tr>
                                        <th colSpan={3}>Dockerfile details</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {image.Config.Cmd !== null && 
                                        <tr>
                                            <td>CMD</td>
                                            <td colSpan={2}>{image.Config.Cmd}</td>
                                        </tr>
                                    }

                                    {image.Config.Entrypoint !== null &&
                                        <tr>
                                            <td>ENTRYPOINT</td>
                                            <td colSpan={2}>{image.Config.Entrypoint[0]}</td>
                                        </tr>
                                    }

                                    {image.Config.Env !== null &&
                                        <>
                                            <tr>
                                                <td rowSpan={image.Config.Env.length + 1}>ENV</td>
                                            </tr>
                                            {image.Config.Env.map(env => {
                                                const [k, v] = env.split("=")
                                                return (
                                                    <tr key={k}>
                                                        <td>{k}</td>
                                                        <td>{v}</td>
                                                    </tr>
                                                )
                                            })}
                                        </>
                                    }

                                </tbody>
                            </table>
                        </div>
                    }
                </div>
            }
        </div>
    )
}

export default Container