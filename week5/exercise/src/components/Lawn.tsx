import { useCallback, useEffect, useMemo, useState, useTransition } from "react"
import { useGrass } from "../hooks/useGrass"
import { GrassBladeContainer } from "./Grass"
import { delay } from "./helpers/delay";

export const Lawn = () => {
  const { grassDto, addGrass, isLoading } = useGrass();
  // const { grassDto, addGrass: _addGrass } = useGrass();
  // const [isPending, startTransition] = useTransition();

  // const [grassAddCount, setGrassAddCount] = useState(0)

  // const addGrass = useCallback(() => {
  //   startTransition(async () => {
  //     await delay(2000)
  //     startTransition(() => {
  //       setGrassAddCount(count => count + 1)
  //       _addGrass()
  //     })
  //   })

  // }, [_addGrass])

  useEffect(() => {
    console.log('GrassDTO updated:', grassDto)
  }, [grassDto])

  return <div id="lawn">
    <div>Is pending: {isLoading ? 'Yes' : 'No'}</div>
    {/* <div>Grass add count: {grassAddCount}</div> */}
    <button onClick={addGrass} disabled={isLoading}>Add Grass</button>
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
  const { grass, isLoading, addGrass } = useGrass()
  const totalHeight = useMemo(() => grass.reduce((acc, g) => acc + g.height, 0), [grass])

  // HW -- fix the logic so that we don't reload the entire page

  return <div>
    <div>Total grass height: {totalHeight}</div>
    <div>Is pending: {isLoading ? 'Yes' : 'No'}</div>
    <button onClick={addGrass} disabled={isLoading}>Add Grass</button>
  </div>
}

