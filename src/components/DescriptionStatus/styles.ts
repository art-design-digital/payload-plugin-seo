import styled from 'styled-components'

export const ProgressLabelSC = styled.div`
  display: flex;
  justify-content: space-between;
  .progressWrapper {
    height: 100%;

    &__inner {
      display: flex;
      height: 100%;
      flex-direction: column;
      justify-content: flex-end;
      align-items: center;
    }

    &__text {
      font-size: 90%;
      line-height: 1;
      margin-bottom: 5px;
    }

    &__bar {
      width: 100%;
      position: relative;
      height: 2px;
      border-radius: 5px;
      background-color: var(--color-base-600);
      overflow: hidden;

      &__fill {
        position: absolute;
        height: 100%;
        top: 0;
        left: 0;
      }
    }
  }
`
