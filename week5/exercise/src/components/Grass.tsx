import { useCallback, useEffect, useState } from "react"
import { Grass } from "../types/Grass"
import { useGrassBlade } from "../hooks/useGrass"

type GrassBladeContainerProps = {
  id: Grass['id']
  onGrow?: (id: number, height: number) => void
}
export const GrassBladeContainer = ({ id }: GrassBladeContainerProps) => {
  const { grass, onGrow } = useGrassBlade(id)

  const [height, setHeight] = useState<Grass['height']>(grass.height)

  const handleGrow = useCallback(() => {
    console.log(`Grass with id ${grass.id} grew to height ${height}`)

    const newHeight = (height ?? 0) + 10;
    onGrow?.(newHeight)
    setHeight(newHeight)
  }, [height])

  useEffect(() => {
    if (height === grass.height) return
    setHeight(grass.height)
  }, [grass.height, height])
  
  // useEffect(() => {
  // }, [height])

  return <div>
    <button onClick={handleGrow}>+ ({height})</button>
    <GrassBlade height={height} />
  </div>
}
const GrassBlade = ({ height }: { height: Grass['height'] }) => {
  return <div style={{ width: '10px', height: `${height}px`, backgroundColor: 'green', margin: '2px' }} />
}
