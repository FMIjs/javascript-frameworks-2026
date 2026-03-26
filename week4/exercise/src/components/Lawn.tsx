import { useEffect, useMemo } from "react"
import { useGrass } from "../hooks/useGrass"
import { GrassBladeContainer } from "./Grass"

export const Lawn = () => {
  const { grassDto, addGrass } = useGrass()

  useEffect(() => {
    console.log('GrassDTO updated:', grassDto)
  }, [grassDto])

  return <div id="lawn">
    <button onClick={addGrass}>Add Grass</button>
    <LawnStats />
    <div id="grass-container">
      {grassDto.map(g => <GrassBladeContainer
        key={g.id}
        id={g.id}
      />)}
    </div>
  </div>
}

const LawnStats = () => {
  const { grass, } = useGrass()
  const totalHeight = useMemo(() => grass.reduce((acc, g) => acc + g.height, 0), [grass])

  // HW -- fix the logic so that we don't reload the entire page

  return <div>Total grass height: {totalHeight}</div>
}

