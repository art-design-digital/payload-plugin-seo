import styled from 'styled-components'

const ProgressLabel = styled.div`
  display: flex;
  justify-content: space-between;
  .progressWrapper {
    height: 30.77px;

    &__inner {
      display: flex;
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
