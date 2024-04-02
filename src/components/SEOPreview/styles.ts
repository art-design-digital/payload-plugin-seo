import styled from 'styled-components'

export const SEOPreviewSC = styled.div<{ $dark?: boolean }>`
  margin-bottom: var(--spacing-field);

  .actions {
    width: max-content;
    display: flex;
    justify-content: flex-start;
    margin-bottom: 1rem;
    border-radius: 5px;
    overflow: hidden;
    border: 1px solid var(--theme-elevation-150);
    button {
      border-radius: 0;
      border: none;
      background-color: transparent;
      padding: 8px;
      cursor: pointer;

      &.active {
        background-color: var(--theme-elevation-100);
        color: var(--color-white);
      }

      &:not(:first-child) {
        margin-left: -1px;
        border-left: 1px solid var(--theme-elevation-150);
      }
    }
  }

  .content {
    font-family: Arial, sans-serif;
    padding: 1rem;
    border: 1px solid var(--theme-elevation-150);
    width: max-content;
    background-color: ${props => (props.$dark ? '#202124' : '#ffffff')};

    .header {
      .favicon {
        border-color: ${props => (props.$dark ? '#9aa0a6' : '#dadce0')};
      }
      .site-name {
        color: ${props => (props.$dark ? '#dadce0' : '#202124')};
      }
      .site-url {
        color: ${props => (props.$dark ? '#bdc1c6' : '#4d5156')};
      }
    }

    .seo-title {
      color: ${props => (props.$dark ? '#8ab4f8' : '#1a0dab')};
    }

    .seo-description {
      color: ${props => (props.$dark ? '#bdc1c6' : '#4d5156')};

      .date {
        color: ${props => (props.$dark ? '#9aa0a6' : '#4d5156')};
      }
    }

    &.desktop {
      .inner-body {
        max-width: 652px;
        display: flex;
        gap: 20px;

        .left {
          min-width: 540px;
          max-width: 600px;

          .header {
            display: flex;
            gap: 12px;
            align-items: center;

            .favicon {
              width: 26px;
              height: 26px;
              border: 1px solid;
              background-color: white;
              border-radius: 50%;
            }

            .site {
              display: flex;
              flex-direction: column;

              .site-name {
                font-size: 14px;
                line-height: 20px;
              }

              .site-url {
                font-size: 12px;
                line-height: 18px;
              }
            }
          }

          .seo-title {
            margin-top: 5px;
            margin-bottom: 3px;
            display: inline-block;
            font-size: 20px;
            font-weight: 400;
            line-height: 1.3;
            word-wrap: normal;
            word-break: keep-all;
            width: 100%;
          }

          .seo-description {
            display: inline-block;
            font-size: 14px;
            font-weight: 400;
            line-height: 1.58;
            position: relative;
            word-wrap: normal;
          }
        }

        .right {
          .seo-image-wrapper {
            width: 92px;
            height: 92px;
            border-radius: 8px;
            overflow: hidden;

            .seo-image {
              object-fit: cover;
              object-position: center;
              width: 100%;
              height: 100%;
            }

            .seo-image-error {
              width: 100%;
              height: 100%;
              font-size: 80%;
              line-height: 1.3;
              padding: 0.5rem;
              background-color: var(--color-error-600);
            }
          }
        }
      }
    }

    &.mobile {
      .inner-body {
        width: 382px;

        .header {
          margin-bottom: 11px;
          display: flex;
          gap: 12px;
          align-items: center;

          .favicon {
            width: 28px;
            height: 28px;
            border: 1px solid;
            background-color: white;
            border-radius: 50%;
          }

          .site {
            display: flex;
            flex-direction: column;

            .site-name {
              font-size: 14px;
              line-height: 20px;
              font-weight: 400;
            }

            .site-url {
              font-size: 12px;
              line-height: 16px;
              font-weight: 400;
            }
          }
        }

        .seo-title {
          font-size: 20px;
          line-height: 26px;
          margin-bottom: 12px;
          font-weight: 400;
        }

        .seo-description-wrapper {
          display: flex;
          width: 100%;
          gap: 16px;

          .seo-description {
            flex: 1;
            font-size: 14px;
            line-height: 20px;
          }

          .seo-image-wrapper {
            width: 104px;
            height: 104px;
            border-radius: 8px;
            overflow: hidden;

            .seo-image {
              object-fit: cover;
              object-position: center;
              width: 100%;
              height: 100%;
            }

            .seo-image-error {
              width: 100%;
              height: 100%;
              font-size: 80%;
              line-height: 1.3;
              padding: 0.5rem;
              background-color: var(--color-error-600);
            }
          }
        }
      }
    }
  }
`
