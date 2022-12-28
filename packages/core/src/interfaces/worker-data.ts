/**
 * Interface to hold worker data
 *
 * @interface IWorkerData
 */
export interface IWorkerData {
  promise: Promise<void>;
  shutdownResolver: () => void;
}

export default IWorkerData;
