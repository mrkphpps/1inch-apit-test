import { setWorldConstructor } from '@cucumber/cucumber';
import { CustomWorld } from './context';

// Register the custom World constructor
// This ensures each scenario gets its own isolated World instance
setWorldConstructor(CustomWorld);
