def collatz_sequence(n):
    """
    this function generates the collatz conjecture
    Generate the Collatz (3n + 1) sequence starting from n.
    Returns a list containing the sequence.
    """
    if n < 1:
        raise ValueError("Input must be a positive integer.")
    sequence = [n]
    while n != 1:
        if n % 2 == 0:
            n //= 2
        else:
            n = 3 * n + 1
        sequence.append(n)
    return sequence

if __name__ == "__main__":
    try:
        num = int(input("Enter a positive integer to start the Collatz sequence: "))
        seq = collatz_sequence(num)
        print("Collatz sequence:", seq)
    except ValueError as e:
        print("Error:", e)