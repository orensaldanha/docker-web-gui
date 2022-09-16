import { useEffect, useState } from 'react'
import axios from 'axios';

const Containers = () => {
    const [containers, setContainers] = useState([])
    
    useEffect(() => {
        const getContainers = async () => {
            const res = await axios.get('/container')
            setContainers(res.data.containers)
        }
        getContainers()
    }, [])


    const getPublishedPorts = (container) => {
        let published_ports = ""
        container.Ports.forEach(port => {
            if ('PublicPort' in port && port.IP === "0.0.0.0") {
                console.log(port)
                if(published_ports === "") 
                    published_ports += `${port.PublicPort}:${port.PrivatePort}`
                else 
                published_ports += `, ${port.PublicPort}:${port.PrivatePort}`
            }
        })

        if(published_ports === "")
            return "-"

        return published_ports
    }
    
    return (
        <div>
            <h1>Containers</h1>

            <table className="table table-bordered">
                <thead className="table-dark">
                    <tr>
                        <th>Name</th>
                        <th>State</th>
                        <th>Image</th>
                        <th>Created</th>
                        <th>IP Address</th>
                        <th>Published Ports</th>
                    </tr>
                </thead>
                
                <tbody>
                    {containers.map(container => {
                        const name = container.Names[0].substring(1)
                        const published_ports = getPublishedPorts(container)
                        return (
                            <tr key={container.Id}>
                                <td>{name}</td>
                                <td>{container.State}</td>
                                <td>{container.Image}</td>
                                <td>{container.Created}</td>
                                <td>{container.NetworkSettings.Networks.bridge.IPAddress || '-'}</td>
                                <td>{published_ports}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}

export default Containers;

