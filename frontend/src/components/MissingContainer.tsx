import styled from 'styled-components';
import MissingContainerElement from './MissingContainerElement';
const StyledMissingContainer = styled.div`
  /* background: var(--outline-lighten); */
  /* box-shadow: inset 0 0 10px var(--outline); */
  box-shadow: inset -20px 0px 20px -10px var(--outline);
  border-radius: 0.2rem;
  height: 100%;
  /* width: 100%; */

  background: linear-gradient(rgba(255, 255, 255, 0.87), rgba(255, 255, 255, 0.87)),
    url('https://i.ibb.co/gy897P8/tlo.png');

  .title {
    color: var(--dark-grey);
    font-size: 1.7em;
    font-weight: 700;
    text-align: center;
    margin: 1.3rem 0;
    text-shadow: 0px 0px 15px var(--text-shadow-white);
  }
  .missing-catalog {
    display: flex;
    flex-direction: column-reverse;
    gap: 1rem;
  }

  max-width: 750px;

  @media (min-width: 800px) {
    overflow-y: scroll;
    width: 33vw;
    min-width: 25rem;
    max-width: 450px;
    padding: 0 1rem 1.5rem 1rem;
  }
`;
function MissingContainer({
  data,
  props,
  selectedItem,
  setSelectedItem,
  setCordinates,
  setDeleteMissing,
}: any) {
  //console.log(selectedItem);
  const today = new Date();
  function daysFromToday(date: string): any {
    const dateFormat = new Date(date);
    var diff = Math.abs(today.getTime() - dateFormat.getTime());
    var diffDays = Math.ceil(diff / (1000 * 3600 * 24));
    return diffDays;
  }
  function sortingFunction(a: any, b: any) {
    let timeA: string = a.time;
    let timeB: string = b.time;
    let dateA: any = new Date(timeA);
    let dateB: any = new Date(timeB);
    return dateA - dateB;
  }
  return (
    <StyledMissingContainer>
      <p className="title">Zaginione zwierzęta w okolicy</p>
      <div className="missing-catalog">
        {data.length &&
          data 
            //filter removed for the purpose of hosting demo app version
            .filter((data: any) => daysFromToday(data.time) <= 3000000000000)
            .sort(sortingFunction)
            .map((e: any, index: number) => {
              return (
                <div key={index}>
                  <MissingContainerElement
                    data={e}
                    index={index}
                    selectedItem={selectedItem}
                    setSelectedItem={setSelectedItem}
                    setCordinates={setCordinates}
                    setDeleteMissing={setDeleteMissing}
                  />
                </div>
              );
            })}
      </div>
    </StyledMissingContainer>
  );
}
export default MissingContainer;
