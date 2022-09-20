import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import axios from "axios"
import moment from "moment"

const Volume = () => {
    const { volumeName } = useParams()
    const navigate = useNavigate();
    const [volume, setVolume] = useState()
    
    useEffect(() => {
        const getVolume = async () => {
            const res = await axios.get(`/volumes/${volumeName}`)
            setVolume(res.data)
        }
        getVolume()
    }, [volumeName])


    const removeVolume = async (volumeName) => {
        //todo -  only images with no containers can be removes or force stopped containers
        const res = await axios.delete(`/volumes/${volumeName}`)
        if(res.status === 204) {
            navigate('/volumes')
        }
        
    }

    return (
        <div>
            <h1>Volume Details</h1>

            {volume === undefined ? 
                <div className="spinner-border"></div> 
            :
                <div>
                    <div>
                        <h2>Actions</h2>
                        <button onClick={() => removeVolume(volume.Name)}>Remove</button>
                    </div>

                    <div className="col-sm-6">

                        <table className="table table-bordered">
                            <thead className="table-dark">
                                <tr>
                                    <th colSpan={2}>Volume details</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Name</td>
                                    <td>{volume.Name}</td>
                                </tr>
                                <tr>
                                    <td>Created</td>
                                    <td>{moment(volume.CreatedAt).format("YYYY-MM-DD HH:mm:ss")}</td>
                                </tr>
                                <tr>
                                    <td>Mount path</td>
                                    <td>{volume.Mountpoint}</td>
                                </tr>
                                <tr>
                                    <td>Driver</td>
                                    <td>{volume.Driver}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            }
        </div>
    )
}

export default Volume